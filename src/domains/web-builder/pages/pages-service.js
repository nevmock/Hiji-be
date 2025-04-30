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
            Page.find({ bussiness_id }).populate('bussiness_id'),
            Page.countDocuments({ bussiness_id })
        ]);

        return { pages, total };
    }

    async getById(user_id, bussiness_id, id) {
        const bussiness = await bussinessService.getById(bussiness_id, user_id);

        if (!bussiness) {
            throw BaseError.notFound("Bussiness not found");
        }

        const page = await Page.findById(id).populate('bussiness_id');

        if (!page) {
            throw BaseError.notFound("Page not found");
        }

        if (page.bussiness_id._id != bussiness_id) {
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

        const [countFoundSlug] = await Promise.all([
            Page.countDocuments({slug: defaultSlug, bussiness_id: bussiness_id})
        ])

        if (countFoundSlug > 0) {
            defaultSlug += `-${countFoundSlug}`
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

        const updatedPage = await Page.findByIdAndUpdate(
            createdPages._id, {
                assets_uri: pagesPath
            },
            { new: true }
        )

        if (!updatedPage) {
            throw new Error("Failed to update pages");
        }

        await this.addSlugService(bussiness.sub_domain_default, bussiness.user_id, bussiness.id, defaultSlug, createdPages._id);

        return updatedPage;
    }

    async update(user_id, bussiness_id, id, data) {
        console.log(data);
        const bussiness = await bussinessService.getById(bussiness_id, user_id);

        if (!bussiness) {
            throw BaseError.notFound("Bussiness not found");
        }

        const page = await this.getById(user_id, bussiness_id, id);

        if (!page) {
            throw BaseError.notFound("Page not found");
        }

        if (data.slug != page.slug) {
            await this.deleteSlugService(bussiness.sub_domain_default, page.slug);
            await this.addSlugService(bussiness.sub_domain_default, bussiness.user_id, bussiness.id, data.slug, id);
        }

        const [updatedPage] = await Promise.all([
            Page.findByIdAndUpdate(
                id, {
                    grapes_config: data.grapes_config,
                    slug: data.slug,
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
            deletePageDirectory(page.assets_uri),
            this.deleteSlugService(bussiness.sub_domain_default, page.slug)
        ]);

        return true;
    }

    async addSlugService(sub_domain_default, user_id, bussiness_id, slug, page_id) {
        try {
            const response = await axios.post(`${process.env.DOMAIN_SERVICE_URL}/v1/subdomain/slug`, {
                user_id: user_id,
                bussiness_id: bussiness_id,
                name: sub_domain_default,
                slug: slug,
                page_id: page_id
            });

            console.log(response.data);

            return response.data.data;
        } catch (error) {
            console.log("Error add slug service:");
            console.log(error);
        }
    }

    async deleteSlugService(sub_domain_default, slug) {
        try {
            const response = await axios.delete(`${process.env.DOMAIN_SERVICE_URL}/v1/subdomain/slug`, {
                data: {
                    name: sub_domain_default,
                    slug: slug
                }
            });

            console.log(response.data);

            return response.data.data;
        } catch (error) {
            console.log("Error delete slug service:");
            console.log(error);
        }
    }
}

export default new PagesService();