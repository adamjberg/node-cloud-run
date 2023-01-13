# Node Cloud Run

This is an experiment to test out Cloud Run with a simple Node.JS web server.

```
npm init
npm i express
```

Head to the [Cloud Run](https://console.cloud.google.com/run) page inside Google Cloud

![image](https://user-images.githubusercontent.com/1812989/212382487-ea048bc4-d78b-43ec-a1a0-75b588592d0c.png)

Click Create Service

![image](https://user-images.githubusercontent.com/1812989/212382524-6223c016-562c-47bf-a9bc-287dcc554513.png)

Select "Continuously deploy new revisions from a source repository
Then Click "SET UP WITH CLOUD BUILD"

![image](https://user-images.githubusercontent.com/1812989/212382683-a82bf6c4-7bec-4ae6-910e-31d8e7673caa.png)

Click the "Manage connected repositories" and follow instructions to "Install Google Cloud Build".  You can select "All repositories" or only the one you would like to run using this service.

![image](https://user-images.githubusercontent.com/1812989/212382821-4a795584-d7d3-4968-98a9-1ffc971c9d68.png)

You should then be able to select a "Repository"

![image](https://user-images.githubusercontent.com/1812989/212383086-e98be4b1-b1c8-4155-bef0-d861500673c7.png)

Select the second option for "Go, Node.js, Pythin, .NET Core, Ruby or PHP via Google Cloud's buildpacks" and leave the rest of the options as defaults.

![image](https://user-images.githubusercontent.com/1812989/212383201-f98de4d0-d451-4eb9-90f7-1e93607acac5.png)

Now click "SAVE"

![image](https://user-images.githubusercontent.com/1812989/212383768-d8399189-4b1b-4f2c-bc7c-517c41aea314.png)

Update autoscaling to only allow 1 max instance.  This is just for testing purposes, so you don't want some bot coming along and generating significant load that you end up paying for.

Leave the min at 0 as this allows the container to be completely shut down if there are no requests.  This should reduce costs as for a test like this it should be very possible to remain in the free tier of Cloud Run.

Select "Allow unauthenticated invocations"

![image](https://user-images.githubusercontent.com/1812989/212384861-d5fa6c61-5b0b-4b7b-81a1-820416045b40.png)

Open the Container, Networking, Security accordion and update the "Container port" to match whatever port your app is listening on.  It seems like they automatically inject a PORT environment variable, that would probably allow you to just use that in your code to avoid changing this.

![image](https://user-images.githubusercontent.com/1812989/212385156-d0ceee39-98ed-4051-acc6-650c90413bf6.png)

Tweak any other settings that you need (the default capacity seems pretty reasonably tuned for a very small web application)

![image](https://user-images.githubusercontent.com/1812989/212385316-59a7b904-db0a-47f1-8d6f-19b1ca1e5456.png)

Then hit create

![image](https://user-images.githubusercontent.com/1812989/212385400-708a1e97-cedc-4886-8e49-cddf413b308a.png)

This initial build will take a few minutes, but after some loading you should see a URL show up and when clicked it should direct you to the web service you just deployed.

![image](https://user-images.githubusercontent.com/1812989/212385629-c1b68764-4996-410e-adc7-3b209565fd6d.png)

![image](https://user-images.githubusercontent.com/1812989/212385664-2acd7f3d-abdb-441f-8b50-832b3a15bee7.png)

## Concluding Thoughts

While this was nice to deploy straight from Node.JS source, I have a feeling this would run into trouble as soon as additional build layers are added (e.g. TypeScript).  In addition to this, running the deploy this way doesn't bring the benefits of Docker to local development.  For these reasons, I would suggest moving forward with creating Dockerfiles for projects and then deploying those Docker images instead of relying on the Deploy from source option in Cloud Run.
