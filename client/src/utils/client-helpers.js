let url;

if (process.env.NODE_ENV === 'production') {
  url = 'https://checklistshare.herokuapp.com/#/';
} else {
  url = 'http://localhost:8080/#';
}
const clientBaseURL = url;

export default clientBaseURL;
