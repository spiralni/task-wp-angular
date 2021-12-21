const rootURL = 'http://localhost:81/tasks-wp'

const AppConfig = {
    rootURL: rootURL,
    taskURL: `${rootURL}/wp-json/wp/v2/tasks`,
    authURI: `${rootURL}/wp-json/jwt-auth/v1/token`,
    authToken: ''
}

export default AppConfig