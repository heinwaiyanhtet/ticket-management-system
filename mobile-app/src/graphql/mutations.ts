/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createEmployee = /* GraphQL */ `mutation CreateEmployee($input: CreateEmployeeInput!) {
  createEmployee(input: $input) {
    ... on User {
      id
      status
      name
      department
      employeeId
    }
    ... on ErrorResponse {
      errorType
      message
    }
  }
}
` as GeneratedMutation<
  APITypes.CreateEmployeeMutationVariables,
  APITypes.CreateEmployeeMutation
>;
export const createTicket = /* GraphQL */ `mutation CreateTicket($input: CreateTicketInput!) {
  createTicket(input: $input) {
    ... on Ticket {
      id
      forDate
      curryId
      userId
      createdAt
      updatedAt
    }
    ... on ErrorResponse {
      errorType
      message
    }
  }
}
` as GeneratedMutation<
  APITypes.CreateTicketMutationVariables,
  APITypes.CreateTicketMutation
>;
