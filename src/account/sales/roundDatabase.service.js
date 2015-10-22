class RoundDatabaseService {
  constructor($q) {
    this.$q = $q;
    this.db = new PouchDB('marchambul');
    this.remote = new PouchDB('https://marchambul.cloudant.com/cashregister');
    for (let field of ['configId', 'roundId']){
      console.log("create " + field);
      this.db.createIndex({
        index: {
          fields: ['type', field]
        }
      });
    }

    this.remote.replicate.to(this.db,
      {filter: (doc) => !doc._deleted}
    );
  }

  getDocument(id){
    console.log("doc: " + id);
    return this.db.get(id);
  }

  listDocuments(selector){
    var deferred = this.$q.defer();
    this.db.find({selector: selector}).then((res) => {
      deferred.resolve(res.docs);

    }).catch((err) => {
      console.log("error: " + err);
      deferred.reject(err);
    });
    return deferred.promise;
  }
}

angular.module("marchambul").service("RoundDatabaseService", RoundDatabaseService);
