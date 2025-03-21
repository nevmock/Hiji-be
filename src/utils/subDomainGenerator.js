import Bussiness from "../models/bussiness.js";

const subDomainGenerator = async (name) => {
    let subDomain = `${name.toLowerCase().replace(/\s/g, "-")}`;

    while (await Bussiness.countDocuments({ sub_domain: subDomain }) > 0) {
        subDomain = `${name.toLowerCase().replace(/\s/g, "-")}`;
    }

    return subDomain;
}

export default subDomainGenerator;