import { Request, Response } from "express";
import { UserInfo } from "../entity/user.entity";
import { Certificate } from "../entity/certificate.entity";
import { AppDataSource } from "../config";

export const certificate = async (req: Request, res: Response) => {
    const { userId, courseName } = req.body;
    const users = AppDataSource.getRepository(UserInfo);

    if (!userId || !courseName) {
        return res.status(404).json({ message: "certificate not found" })
    }
    try {
        const user = await users.findOne({ where: { id: req.user?.id } })
        if (!user) {
            return res.status(404).json({
                message: "user not found",
            })
        }

        const certificates = new Certificate();
        certificates.user = user
        certificates.courseName = courseName
        const certificateData = AppDataSource.getRepository(Certificate);
        await certificateData.save(certificates)

        res.status(201).json({
            id: certificates.id,
            user: certificates.user,
            courseName: certificates.courseName,
        })

    } catch (err) {
        return res.status(500).json({
            message: "Interal server not found"
        })
    }
}

export const getCertificate = async (req: Request, res: Response) => {
    const certifi = AppDataSource.getRepository(Certificate);

    try {
        const allCertifi = await certifi.find();
        if (!allCertifi) {
            return res.status(404).json({
                message: "Certificate not found"
            })
        }

        const certificate = allCertifi;

        return res.status(201).json({
            certificate
        })



    } catch (err) {
        return res.status(500).json({
            message: "Internal server"
        })
    }
}

export const getCertificateById = async (req: Request, res: Response) => {
    const certifi = AppDataSource.getRepository(Certificate);
    const certifiId = req.params.id;

    try {
        const allCertifi = await certifi.findOneBy({ id: certifiId });
        if (!allCertifi) {
            return res.status(404).json({
                message: "Certificate not found"
            })
        }

        const certificate = allCertifi;

        return res.status(201).json({
            certificate
        })



    } catch (err) {
        return res.status(500).json({
            message: "Internal server"
        })
    }
}

export const delCertificateById = async (req: Request, res: Response) => {
    const certifi = AppDataSource.getRepository(Certificate);
    const certifiId = req.params.id;

    try {
        const allCertifi = await certifi.findOneBy({ id: certifiId });
        await certifi.delete({id: certifiId});
        if (!allCertifi) {
            return res.status(404).json({
                message: "Certificate not found"
            })
        }

        const certificate = allCertifi;

        return res.status(201).json({
            message: "Certificate deleted successfully"
        })



    } catch (err) {
        return res.status(500).json({
            message: "Internal server"
        })
    }
}