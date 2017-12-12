
import axios from 'axios'
const domain = 'http://ec2-52-14-138-11.us-east-2.compute.amazonaws.com:8080'
const fetchApiData  = (URL,method,data) => (
    axios({
        url: `/api${URL}`,
        method: method,
        data: data || ''
    })
    .then(({data}) => data)
)
export default fetchApiData
