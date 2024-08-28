import { Response, Request } from "express";
import prisma from "../prismaClient";
import { checkAuthorizedByAdmin } from "../middlewares/authMiddleware";

export const createAddress = async (req: Request, res: Response) => {
  try {
    const {
      name,
      userId,
      houseNumber,
      floor,
      apartment,
      landmark,
      address,
      pincode,
    } = req.body;
    const userAddressLength = await prisma.address.count({
      where: {
        userId: userId
      }
    })
    const addressData = await prisma.address.create({
      data: {
        name: name,
        isDefault: userAddressLength === 0,
        addressId: `${userId}-${houseNumber}-${floor}-${apartment}`,
        userId,
        houseNumber,
        floor,
        apartment,
        landmark,
        address,
        pincode,
      },
    });
    res.status(201).json(addressData);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllAddressesOfUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const addresses = await prisma.address.findMany({
      where: {
        userId,
      },
    });
    res.status(200).json(addresses);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getAddressById = async (req: Request, res: Response) => {
  try {
    const addressId = req.body;
    const address = await prisma.address.findUnique({
      where: {
        addressId,
      },
    });
    res.status(200).json(address);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateAddressById = async (req: Request, res: Response) => {
  try {
    const { addressId, name, setDefault, houseNumber, floor, apartment, landmark, address, pincode } =
      req.body;
    if (setDefault == 1) {
      await prisma.address.updateMany({
        where: {
          userId: req.body.userId,
          isDefault: true
        },
        data: {
          isDefault: false
        }
      });
    }
    const addressData = await prisma.address.update({
      where: {
        addressId,
      },
      data: {
        addressId: addressId,
        name: name,
        isDefault: setDefault == 1,
        houseNumber: houseNumber,
        floor: floor,
        apartment: apartment,
        landmark: landmark,
        address: address,
        pincode: pincode,
      },
    });
    res.status(200).json(addressData);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAddressById = async (req: Request, res: Response) => {
  try {
    const addressId = req.body;
    const addressData = await prisma.address.delete({
      where: {
        addressId,
      },
    });
    if (addressData.isDefault) {
      const newDefaultAddress = await prisma.address.findFirst({
        where: {
          userId: addressData.userId
        }
      });
      if (newDefaultAddress) {
        await prisma.address.update({
          where: {
            addressId: newDefaultAddress.addressId
          },
          data: {
            isDefault: true
          }
        });
      }
    }
    res.status(200).json(addressData);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
