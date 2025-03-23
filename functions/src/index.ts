import * as admin from 'firebase-admin';

admin.initializeApp();

import { addUser } from "./addUser";
import { addUserByGoogleAuth } from "./addUserByGoogleAuth";

export { addUser , addUserByGoogleAuth };