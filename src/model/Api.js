
import axios from 'axios'
const domain = 'http://ec2-52-14-138-11.us-east-2.compute.amazonaws.com:8080'
const fetchApiData = (URL, method, data) => (
    axios({
        url: `${domain}/nma/api${URL}`,
        method: method,
        data: data || ''
    })
    .then((res) => {
    
        if (res.data.message) {
            alert(res.data.message)
        } else if (res.data.error && res.data.error.lenght !== 0) {
            res.data.error.forEach((field) => {
                alert(field.message)
            })
        }
        return res
    })
    .then(({ data }) => data)
    .catch(function (error) {
        console.log(error);
    })
)
export default fetchApiData
