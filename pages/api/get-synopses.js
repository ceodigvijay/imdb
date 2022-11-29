import nextConnect from 'next-connect';
import middleware from "../../middlewares/middleware";
import mongodb, {ObjectId} from 'mongodb';

const handler = nextConnect();

handler.use(middleware);


const getByID = async (req) => {
    const ip = req.socket.localAddress;
    const { query: { id } } = req;
    const query = { _id: new ObjectId(id) }
    const favData = await req.db.collection("favourites").findOne({
      user_ip: ip,
      movie_id: new ObjectId(id),
    });
    
    return await req.db
        .collection('movies')
        .findOne(query)
        .then((data) => {
            return {...data, favourite: favData ? 1 : 0}
        })
        .catch(error => {
            return Promise.reject(
                {
                    status: 'error',
                    message: error.error,
                }
            )
        });
}

handler.get((req, res) => {
    return getByID(req).then(data => {
        return res.json(data);
    }).catch(error => {

        return Promise.reject(
            res.status(200).send({
                status: error.toString()
            })
        )
    });
});


export default handler;