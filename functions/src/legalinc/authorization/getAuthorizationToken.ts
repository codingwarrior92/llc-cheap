import * as functions from "firebase-functions"
import * as firebase from "firebase-admin"
import { firestore } from "../index"

export async function getAuthorizationToken(
  req: functions.https.Request,
  res: functions.Response<any>
) {
  console.log("Create Client Called")

  try {
    const email = req.body.email

    const clientQS = await firestore
      .collection("Clients")
      .where("email", "==", email)
      .get()

    const clientData = clientQS.docs

    if (clientData.length > 0) {
      return res.status(403).json({
        message: "Client with email " + email + " already exists",
      })
    }

    const clientRecord = await firebase.auth().createUser({
      email: email,
      password: req.body.password,
    })

    console.log("Successfully created new client:", email)

    await firestore.collection("Clients").doc(clientRecord.uid).set({
      userType: "client",
      name: req.body.name,
      address: req.body.address,
      id: clientRecord.uid,
      email: email,
      telephoneNumber: req.body.telephoneNumber,
      // ordersHistory: null,
    })

    const data = await firestore.collection("Clients").doc(clientRecord.uid).get()
    return res.status(201).json(data.data())

  } catch (error) {
    console.log("error ", error)
    return res.status(403).json(error)
  }
}
