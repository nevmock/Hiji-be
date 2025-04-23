import Bussiness from "../models/bussiness.js";

const subDomainGenerator = async (name) => {
    let subDomain = `${name.toLowerCase().replace(/\s/g, "-")}`;

    while (await Bussiness.countDocuments({ sub_domain_default: subDomain }) > 0) {
        subDomain = `${subDomain}-${Math.floor(Math.random() * 10000)}`;
    }

    return subDomain;
}

export default subDomainGenerator;