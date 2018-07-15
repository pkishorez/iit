import { MongoClient, Db } from "mongodb";

let DBConnection: Db | undefined;
MongoClient.connect(
	"mongodb://127.0.0.1:27017",
	(err, res) => {
		if (!err && res) {
			DBConnection = res.db("iiitn");
		}
	}
);

export let Actions = {
	update(data: any) {
		if (!DBConnection) {
			return { error: "Cool daa" };
		}
		DBConnection.collection("user").update(
			{
				_id: data.id
			},
			data,
			{
				upsert: true
			}
		);
	}
};
