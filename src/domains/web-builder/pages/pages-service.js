import axios from "axios";
import BaseError from "../../../base_classes/base-error.js";
import Bussiness from "../../../models/bussiness.js";
import Page from "../../../models/page.js";
import createPageDirectory from "../../../utils/createPageDirectory.js";
import bussinessService from "../bussiness/bussiness-service.js";
import deletePageDirectory from "../../../utils/deletePageDirectory.js";
import subDomainGenerator from "../../../utils/subDomainGenerator.js";

class PagesService {
    async get(user_id, bussiness_id) {
        const bussiness = await bussinessService.getById(bussiness_id, user_id);

        if (!bussiness) {
            throw BaseError.notFound("Bussiness not found");
        }

        const [pages, total] = await Promise.all([
            Page.find({ bussiness_id }),
            Page.countDocuments({ bussiness_id })
        ]);

        return { pages, total };
    }

    async getById(user_id, bussiness_id, id) {
        const bussiness = await bussinessService.getById(bussiness_id, user_id);

        if (!bussiness) {
            throw BaseError.notFound("Bussiness not found");
        }

        const page = await Page.findById(id);

        if (!page) {
            throw BaseError.notFound("Page not found");
        }

        if (page.bussiness_id != bussiness_id) {
            throw BaseError.forbidden("Forbidden");
        }

        return page;
    }

    async create(user_id, bussiness_id) {
        const bussiness = await bussinessService.getById(bussiness_id, user_id);

        if (!bussiness) {
            throw BaseError.notFound("Bussiness not found");
        }

        let defaultSlug = 'landing-page';

        const [countFoundSlug, countTotalPage] = await Promise.all([
            Page.countDocuments({slug: defaultSlug, bussiness_id: bussiness_id}),
            Page.countDocuments({bussiness_id: bussiness_id})
        ])

        if (countFoundSlug > 0) {
            defaultSlug += `-${countFoundSlug}`
        }

        if (!bussiness.sub_domain_default && countTotalPage == 0) {
            // call api from mas rahman
            let sub_domain = await subDomainGenerator(bussiness.bussiness_name);

            console.log(sub_domain);

            console.log({
                user_id: user_id,
                    business_id: bussiness.id,
                    domain: sub_domain
            });

            try {
                const createSubdomainService = await axios.post(`${process.env.DOMAIN_SERVICE_URL}/domain`, { 
                    user_id: user_id,
                    business_id: bussiness.id,
                    domain: `${sub_domain}-test`
                })

                console.log(createSubdomainService);
                
            } catch (error) {
                console.log(error);
            }

            await Bussiness.findByIdAndUpdate(
                bussiness_id, {
                    sub_domain_default: sub_domain
                },
                { new: true }
            )
        }
        
        const pages = new Page({ 
            bussiness_id : bussiness_id,
            slug : defaultSlug,
        });

        const createdPages = await pages.save();

        if (!createdPages) {
            throw new Error("Failed to create pages");
        }

        const pagesPath = `${process.env.BASE_PATH_PREFIX}/${bussiness.user_id}/${bussiness.id}/${createdPages._id}`;

        await createPageDirectory(pagesPath);

        // make me create directory to public/{user_id}/{bussiness_id}/{page_id} for the page

        const updatedPage = await Page.findByIdAndUpdate(
            createdPages._id, {
                assets_uri: pagesPath
            },
            { new: true }
        )

        return updatedPage;
    }

    async update(user_id, bussiness_id, id, data) {
        const bussiness = await bussinessService.getById(bussiness_id, user_id);

        if (!bussiness) {
            throw BaseError.notFound("Bussiness not found");
        }

        const page = await this.getById(user_id, bussiness_id, id);

        if (!page) {
            throw BaseError.notFound("Page not found");
        }

        const [updatedPage] = await Promise.all([
            Page.findByIdAndUpdate(
                id, {
                    grapes_config: data.grapes_config
                },
                { new: true }
            ),
            createPageDirectory(page.assets_uri, data.html, data.css)
        ]);

        return updatedPage;
    }

    async delete(user_id, bussiness_id, id) {
        const bussiness = await bussinessService.getById(bussiness_id, user_id);
        
        if (!bussiness) {
            throw BaseError.notFound("Bussiness not found");
        }

        const page = await this.getById(user_id, bussiness_id, id);

        if (!page) {
            throw BaseError.notFound("Page not found");
        }

        await Promise.all([
            Page.findByIdAndDelete(id),
            deletePageDirectory(page.assets_uri)
        ]);

        return true;
    }
}

export default new PagesService();