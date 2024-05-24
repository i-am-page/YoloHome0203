<template>
    <div class="flex flex-col items-center p-8 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto mt-10">
        <h1 class="text-2xl font-bold text-gray-800 mb-6">FaceID Authentication</h1>
        <div class="w-full space-y-4">
            <button type="button" @click="login"
                class="w-full text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Authenticate
            </button>
            <button type="button" @click="register"
                class="w-full text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Register
            </button>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 90%;
    margin: 20px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1em;
}

.btn {
    border: 1px solid black;
    border-radius: 5px;
    padding: 1em 2em;
}

.btn:hover {
    background: #000;
    color: #fff
}
</style>
<script>
export default {
    data() {
        return {
            user: ''
        }
    },
    methods: {
        login() {
            window.faceio.authenticate({
                "locale": "auto" // Default user locale
            }).then(userData => {
                console.log("Success, user identified")
                console.log("Linked facial Id: " + userData.facialId)
                console.log("Payload: " + JSON.stringify(userData.payload)) // {"whoami": 123456, "email": "john.doe@example.com"} from the enroll() example above
                this.user = userData.payload.whoami
            }).catch(errCode => {
                console.log(errCode)
            })
        },
        register() {
            window.faceio.enroll({
                "locale": "auto",
                "payload": {
                    "whoami": 123456,
                    "email": "john.doe@example.com"
                }
            }).then(userInfo => {
                // User Successfully Enrolled! 
                alert(
                    `User Successfully Enrolled! Details:
           Unique Facial ID: ${userInfo.facialId}
           Enrollment Date: ${userInfo.timestamp}
           Gender: ${userInfo.details.gender}
           Age Approximation: ${userInfo.details.age}`
                );
                console.log(userInfo);
                // handle success, save the facial ID (userInfo.facialId), redirect to the dashboard...
            }).catch(errCode => {
                // Something went wrong during enrollment, log the failure
                console.log(errCode);
            })
        },
        logout() {
            this.user = ''
        },

    }
}
</script>
