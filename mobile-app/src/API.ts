/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateEmployeeInput = {
  status: UserStatus,
  name: string,
  department?: string | null,
  employeeId: number,
};

export enum UserStatus {
  admin = "admin",
  employee = "employee",
}


export type CreateEmployeeResponse = User | ErrorResponse


export type User = {
  __typename: "User",
  id: string,
  status: UserStatus,
  name: string,
  department?: string | null,
  employeeId: number,
};

export type ErrorResponse = {
  __typename: "ErrorResponse",
  errorType: string,
  message: string,
};

export type CreateTicketInput = {
  forDate: string,
  curryId: string,
  userId: string,
};

export type CreateTicketResponse = Ticket | ErrorResponse


export type Ticket = {
  __typename: "Ticket",
  id: string,
  forDate?: string | null,
  curryId?: string | null,
  userId?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type GetUserByEmployeeIdResponse = User | ErrorResponse


export type CreateEmployeeMutationVariables = {
  input: CreateEmployeeInput,
};

export type CreateEmployeeMutation = {
  createEmployee: ( {
      __typename: "User",
      id: string,
      status: UserStatus,
      name: string,
      department?: string | null,
      employeeId: number,
    } | {
      __typename: "ErrorResponse",
      errorType: string,
      message: string,
    }
  ) | null,
};

export type CreateTicketMutationVariables = {
  input: CreateTicketInput,
};

export type CreateTicketMutation = {
  createTicket: ( {
      __typename: "Ticket",
      id: string,
      forDate?: string | null,
      curryId?: string | null,
      userId?: string | null,
      createdAt?: string | null,
      updatedAt?: string | null,
    } | {
      __typename: "ErrorResponse",
      errorType: string,
      message: string,
    }
  ),
};

export type GetUserByEmployeeIdQueryVariables = {
  employeeId: number,
};

export type GetUserByEmployeeIdQuery = {
  getUserByEmployeeId: ( {
      __typename: "User",
      id: string,
      status: UserStatus,
      name: string,
      department?: string | null,
      employeeId: number,
    } | {
      __typename: "ErrorResponse",
      errorType: string,
      message: string,
    }
  ) | null,
};
