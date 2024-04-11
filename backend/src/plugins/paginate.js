const { map } = require('lodash');

const paginate = (schema) => {
  schema.statics.paginate = async function (search, options) {
    let sort = ``;
    if (options.sortBy) {
      let sortingCriteria = {};
      const sortState = options.sortBy.split('-')
      sortingCriteria[sortState[0]] = sortState[1]
      sort = sortingCriteria
    } else {
      sort = 'createdAt';
    }

    const { searchCriteria = null, ...filter } = search;
    if (searchCriteria) {
      map(filter, (value, key) => {
        if (searchCriteria[key]) {
          let filterIntegrate = {};

          if (searchCriteria[key] === 'like') {
            filterIntegrate = { ...filterIntegrate, $regex: value, $options: 'i' };
          }
          if (searchCriteria[key] === 'range') {
            filterIntegrate = { ...filterIntegrate, $gte: value.min, $lte: value.max };
          }

          filter[key] = filterIntegrate;
        }
      });
    }
    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const skip = (page - 1) * limit;
    
    const countPromise = this.countDocuments(filter).exec();
    let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit);

    if (options.populate) {
      docsPromise = docsPromise.populate(
        options.populate
      )
    }

    docsPromise = docsPromise.exec();

    return Promise.all([countPromise, docsPromise]).then((values) => {
      const [totalResults, results] = values;
      const totalPages = Math.ceil(totalResults / limit);
      const result = {
        results,
        page,
        limit,
        totalPages,
        totalResults,
      };
      return Promise.resolve(result);
    });
  };
}

module.exports = paginate;