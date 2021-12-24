import { NegotiationDao } from '../domain/negotiation/NegotiationDao.js';
import { ConnectionFactory } from './ConnectionFactory.js';

export async function getNegotiationDao(){
    let conn = await ConnectionFactory.getConnection();

    return new NegotiationDao(conn);
}
