import Bussiness from "../models/bussiness.js";

const subDomainGenerator = async (name) => {
    let subDomain = `${name.toLowerCase().replace(/\s/g, "-")}-${Math.random().toString(36).substr(2, 5)}`;

    while (await Bussiness.countDocuments({ sub_domain: subDomain }) > 0) {
        subDomain = `${name.toLowerCase().replace(/\s/g, "-")}-${Math.random().toString(36).substr(2, 5)}`;
    }

    return subDomain;
}

export default subDomainGenerator;