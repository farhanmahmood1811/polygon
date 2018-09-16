import Constant from '../core/constant';

const queryString = require('query-string');

class QueryGeneratorService {
    listingMongoQuery = (filter) => {
        let query = {};
        if(filter.state) {
            query.state = filter.state
        }
        if(filter.minPrice) {
            query.price = {
                "$gte": filter.minPrice
            }
        }
        if(filter.maxPrice) {
            query.price = {
                "$lte": filter.maxPrice
            }
        }
        if(filter.rooms) {
            query.rooms = filter.rooms
        }
        if(filter.latitude) {
            query.geo = {
                $near: [filter.longitude, filter.latitude], 
                $maxDistance: Constant.maxGeoDistance
            }
        }
        if(filter.nextId) {
            query.modifiedAt = {"$lte": filter.nextId }
        }
        return query;
    }
    listingQueryParams = (mongoQuery, nextId) => {
        let query = {}
        if(mongoQuery.state) {
            query.state = mongoQuery.state;
        }
        if(mongoQuery.price) {
            if(mongoQuery.price["$gte"]) {
                query.minPrice = mongoQuery.price["$gte"];
            }
            if(mongoQuery.price["$lte"]) {
                query.maxPrice = mongoQuery.price["$lte"];
            }
        }
        if(mongoQuery.rooms) {
            query.rooms = mongoQuery.rooms;
        }
        if(mongoQuery['geo.loc']) {
            query.latitude = mongoQuery['geo']["$near"][1]
            query.longitude = mongoQuery['geo']["$near"][0]
        }
        query.nextId = nextId;
        return queryString.stringify(query)
    }
    bookingQueryParams = (nextId) => {
        const query = {nextId: nextId};
        return queryString.stringify(query)
    }
}

export default new QueryGeneratorService();