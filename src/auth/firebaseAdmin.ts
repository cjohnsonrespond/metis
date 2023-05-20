import * as admin from "firebase-admin";
import { NextApiRequest } from "next";

const verifyIdToken = (token: string) => {
  const firebasePrivateKey: string =
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDkdhSGLgGOKmc/\nlY+qP/PR41gnaiTVjsNiwVHTNSudIBn7noORQ4UJ3H4v1SfR5oema9mNnpST7T/5\nd9vjLQtoJ6t1/hfzmrs97KMGmbXJugBRunMq18eVzi4f7RbyLnmlhyj7tRCcDJxs\nhhWJ40NZ+pd6VuRoBHCd3hUtHiyV6aUjAQoWBLgKTeg7SFQcN+4+etvWGBdGNwRI\n+E6eWLfGAWIw4kS0kKYH+bqdxMyLsglFpVzXiHI2zKXLS5j8lQOw8+L1uTbgGp1Q\ndiLQGpHi8js3XOGbeEtMHqWJpJmb+wIBuxxB7/hgOaIRp+1arlsc4QCMXC9nKkuK\nzKIhvOmPAgMBAAECggEAE3RotVptQHrPla8PRQYIJcXwh6lhdJwhJaOPwRFvOC9N\nIcuy/tJF8yaHH7H3n5y8Ism0BNF4a+ERXcA9WyrxTzpy6UEs2fjsW/lu5+ImrwR7\nVXpap08pDFKP7qEPyf93gByH5WiwVDw7Wn8lOLuVIdrrPlGa8VlQxmjB2ziNacCK\nuAz0enLxIB5lunOM61H13L0e6UjutVXJ09TDgxzYt80Aht+CqnkgCjPORehcvBEY\n5YrMyhih+8TSOX30YEbi0Up261VRlHZ7QyNmydFgO3IoSp7MbeHYUlewALM2qTEd\ngg4wTqja8yCL2qB6XegyO6dwBU8WkqvmnDof3oZNuQKBgQDx+oFl9kBYJku85u58\nRtAgR+P8pkVkVRt0pfu9zts94N5oatO77lF+kcG6OBj5CrzhbEUrJsBB7r9/OJmg\nKgE/GftBVooHBU7H264qhVL/C8L9R2Mr8OQfgOnwxuTNoMld3lrRSmL3CdkPr9ay\nwj92dd+UiDfIqMVMHNHrxa9xGQKBgQDxsw9kixJCtreY4nxSQTViNckUJkgF05zR\no9S9xSE0yIC6rQBvSTgDTs6e/MHiPURYshXrwcP820q3x427Z9SSc7LUGtO9JfQZ\nNdC2NFdLLrg7uQxO5BybGXgyj2yzH5KM5YRwJR3Q3CNZjBpg6yTT2uS4r7YKWs0w\nag3h0sw85wKBgCQf+eF2+fQvA2+YKlJzX+7xzJ+TUxi/e/HWNdcIYsLCJ3H/QMz1\nr0TuDbX3WgMUD064Ezt19Y3iTsR3drfqjXUWM+R1PvX9XN2Jdl7yuIlLADk/xxZw\nSB5L6KEBkHcCYg2ZfIVyTYQD/FvTLIJTbZYJ0u8hxvI1//507wH76U1BAoGAWvXg\nXR5ZiPHqtobF8s7HoGZNfl/JyyeQZPUbIzAFBzBOAfMJrtgHVHdcG0lUTihwiFC9\nHzSU5ZxBylg3Zsf0oAkay+gst4qJCtPN8ERSdeDnRNKnZylB+rzjF2QSrHa9WHko\nFmxhhDDUvOaVJtRXz8MZQMgf4lW50vaWst36LxECgYEA3CD87NItozPTVSsxhxmp\nbmcyrf3YqyBec+tgDIpQn0F7rNUsPb1fURcE+Bnev+CzS8ZEu53ynjCytosUO1vj\nydTCKIKbLt7tLRvHXsZ1Xrr4uN/T6QsWzUVKjtm9Red/m4FhILeVxqwTvBu1G/MT\ncRTU6/GsHIPVIUEyA4xrd3A=\n-----END PRIVATE KEY-----\n";

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: "advance-sonar-368318",
        clientEmail:
          "firebase-adminsdk-5ysjr@advance-sonar-368318.iam.gserviceaccount.com",
        privateKey: firebasePrivateKey.replace(/\\n/g, "\n"),
      }),
    });
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch(() => null);
};

export const loadIdToken = async (
  req: NextApiRequest
): Promise<string | null> => {
  if (!req.cookies.token) return null;
  const decoded = await verifyIdToken(req.cookies.token);
  if (!decoded) return null;
  return decoded.uid;
};
