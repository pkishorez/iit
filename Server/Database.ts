import { MongoClient, Db } from "mongodb";
import { Promise } from "es6-promise";

let DBConnection: Db | undefined;
MongoClient.connect(
	"mongodb://127.0.0.1:27017",
	{ useNewUrlParser: true }
)
	.then(res => {
		DBConnection = res.db("iit");
	})
	.catch(e => console.error("Connection to db failed."));

export let Actions = {
	update(data: any) {
		if (!DBConnection) {
			return Promise.reject("DB ERROR");
		}
		return DBConnection.collection("user")
			.update(
				{
					_id: data.id
				},
				{
					$set: data
				},
				{
					upsert: true
				}
			)
			.catch(() => Promise.reject("Error updating data."));
	},
	getAll() {
		if (!DBConnection) {
			return Promise.resolve({ data: [] });
		}
		return DBConnection.collection("user")
			.find({})
			.toArray() as any;
	},
	get(id: string) {
		if (!DBConnection) {
			return Promise.resolve({ data: {} });
		}
		return DBConnection.collection("user").findOne({
			_id: id
		}) as any;
	}
};
