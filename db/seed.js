import db from "./firebase-config.js";
import products from "../products.js";
import { addDoc, collection } from "firebase/firestore";

const itemCollectionRef = collection(db, "items");

const promises = products.map((product) => addDoc(itemCollectionRef, product));

Promise.all(promises).then(() => {
  console.log("Done");
  process.exit(0);
});
