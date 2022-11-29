import nextConnect from "next-connect";
import middleware from "../../middlewares/middleware";
import mongodb from "mongodb";

const handler = nextConnect();

handler.use(middleware);

const getByID = async (req) => {
  let {
    query: { title },
  } = req;
  title ? title : (title = "");
  const query = { title: { $regex: title } };
  try {
    const data = await req.db
      .collection("movies")
      .find(query)
      .project({
        _id: 1,
        title: 1,
        plot: 1,
        poster: 1,
        imdb: 1,
      })
      .limit(10)
      .skip(0);
    return data.toArray();
  } catch (error) {
    return Promise.reject({
      status: "error",
      message: error.error,
    });
  }
};

handler.get((req, res) => {
  return getByID(req)
    .then((data) => {
      return res.json(data);
    })
    .catch((error) => {
      return Promise.reject(
        res.status(200).send({
          status: error.toString(),
        })
      );
    });
});

export default handler;
