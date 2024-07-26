import { AppRequest } from '../models';

/**
 * @param {AppRequest} request
 * @returns {string}
 */
export function getUserIdFromRequest(request: AppRequest): string {
 /*  console.log('req user ', request.user );
  return request.user && request.user.id; */
  return '37f37fa4-e3eb-4195-b984-b6e1e736c4a5'
}
