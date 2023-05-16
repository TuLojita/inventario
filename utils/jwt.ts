import jwt from "jsonwebtoken";

export const singToken = (_id: string, identity: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("No tienes una llave secreta JWT");
  }

  return jwt.sign({ _id, identity }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET) {
    throw new Error("No tienes una llave secreta JWT");
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET || "", (err, payload) => {
        if (err) return reject("Token no válido");
        const { _id } = payload as { _id: string };
        resolve(_id);
      });
    } catch (error) {
      console.log(error);
      reject("Token no válido");
    }
  });
};
