import { createContext } from "react";
import firebase from "./firebase";

export const FirebaseContext = createContext({firebase:firebase});