/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getUserByEmployeeId = /* GraphQL */ `query GetUserByEmployeeId($employeeId: Int!) {
  getUserByEmployeeId(employeeId: $employeeId) {
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
` as GeneratedQuery<
  APITypes.GetUserByEmployeeIdQueryVariables,
  APITypes.GetUserByEmployeeIdQuery
>;
