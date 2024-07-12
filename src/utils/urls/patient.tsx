import { BASE_URL } from "utils/network/network";

export const CreatePatientUrl = BASE_URL + '/patient/create';

export const GetPatientUrl = BASE_URL + '/patient/get';

export const GetPatientByIdUrl = (id: any) => `${BASE_URL}/patient/${id}`;

export const DeletePatientByIdUrl = (id: any) => `${BASE_URL}/patient/${id}`;

export const UpdatePatientByIdUrl = (id: any) => `${BASE_URL}/patient/${id}`;
