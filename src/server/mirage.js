import {
  Response,
  belongsTo,
  createServer,
  hasMany,
  Model,
  RestSerializer,
} from "miragejs";

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    serializers: {
      // application: RestSerializer,

      // profile: RestSerializer.extend({
      //   include: ["posts"],
      //   embed: true,
      // }),

      post: RestSerializer.extend({
        include: ["profile"],
        embed: true,
      }),
    },

    models: {
      profile: Model.extend({
        posts: hasMany(),
      }),

      post: Model.extend({
        profile: belongsTo(),
        dependent: "destroy",
      }),
    },

    seeds(server) {
      const dbData = sessionStorage.getItem("mirage-db");

      console.log(dbData);

      if (dbData) {
        server.db.loadData(JSON.parse(dbData));
        return;
      }

      // Creating 4 users with varying profile data
      const user1 = server.create("profile", {
        username: "alexdoe",
        createdAt: "Mon May 15 2023 00:00:00 GMT+0530 (India Standard Time)",
        lastActive: "Tue Nov 27 2024 00:00:00 GMT+0530 (India Standard Time)",
        status: "active",
        email: "alexdoe@gmail.com",
        password: "AlexSecure@2024",
        role: "user",
      });

      const user2 = server.create("profile", {
        username: "mariaSmith",
        createdAt: "Sat Sep 10 2022 00:00:00 GMT+0530 (India Standard Time)",
        lastActive: "Wed Nov 20 2024 00:00:00 GMT+0530 (India Standard Time)",
        status: "active",
        email: "maria.smith@example.com",
        password: "MariaStrong@2023",
        role: "admin",
      });

      const user3 = server.create("profile", {
        username: "johnnyAppleseed",
        createdAt: "Fri Nov 12 2021 00:00:00 GMT+0530 (India Standard Time)",
        lastActive: "Tue Nov 26 2024 00:00:00 GMT+0530 (India Standard Time)",
        status: "inactive",
        email: "johnny.appleseed@domain.com",
        password: "Johnny@2021",
        role: "moderator",
      });

      const user4 = server.create("profile", {
        username: "saraLee",
        createdAt: "Fri Feb 03 2023 00:00:00 GMT+0530 (India Standard Time)",
        lastActive: "Mon Nov 25 2024 00:00:00 GMT+0530 (India Standard Time)",
        status: "active",
        email: "sara.lee@website.org",
        password: "SaraL@2024",
        role: "user",
      });

      // Creating 12 posts distributed among these 4 users
      server.create("post", {
        createdAt: "Tue Nov 27 2024 00:00:00 GMT+0530 (India Standard Time)",
        updatedAt: "Tue Nov 27 2024 00:00:00 GMT+0530 (India Standard Time)",
        title: "Exploring the Great Outdoors",
        description:
          "Discover the best hiking trails and camping spots worldwide. Experience the serenity and beauty of nature as you explore breathtaking locations and learn essential outdoor skills to make your journey unforgettable.",
        profile: user1,
      });

      server.create("post", {
        createdAt: "Mon Nov 25 2024 00:00:00 GMT+0530 (India Standard Time)",
        updatedAt: "Tue Nov 26 2024 00:00:00 GMT+0530 (India Standard Time)",
        title: "Tech Innovations of 2024",
        description:
          "A look into the latest technology trends and innovations shaping the future. From groundbreaking advancements in artificial intelligence to the latest breakthroughs in robotics and sustainable tech, this year is packed with significant achievements.",
        profile: user2,
      });

      server.create("post", {
        createdAt: "Fri Nov 22 2024 00:00:00 GMT+0530 (India Standard Time)",
        updatedAt: "Sun Nov 24 2024 00:00:00 GMT+0530 (India Standard Time)",
        title: "Healthy Eating Habits",
        description:
          "Tips and recipes for maintaining a balanced and nutritious diet. Embrace a lifestyle that promotes good health by understanding what goes into your meals and how to make delicious, healthy choices that are good for the body and mind.",
        profile: user3,
      });

      server.create("post", {
        createdAt: "Wed Nov 20 2024 00:00:00 GMT+0530 (India Standard Time)",
        updatedAt: "Sat Nov 23 2024 00:00:00 GMT+0530 (India Standard Time)",
        title: "The Rise of Digital Nomadism",
        description:
          "Exploring the challenges and rewards of remote work around the world. Understand the benefits of working from anywhere, as well as the potential difficulties faced by digital nomads, and tips for thriving in this lifestyle.",
        profile: user4,
      });

      server.create("post", {
        createdAt: "Mon Nov 18 2024 00:00:00 GMT+0530 (India Standard Time)",
        updatedAt: "Wed Nov 20 2024 00:00:00 GMT+0530 (India Standard Time)",
        title: "Winter Fashion Trends 2024",
        description:
          "Stay stylish and warm this winter with our fashion recommendations. Explore the newest trends in outerwear, accessories, and cozy fashion essentials to keep you looking great during chilly weather.",
        profile: user1,
      });

      server.create("post", {
        createdAt: "Fri Nov 15 2024 00:00:00 GMT+0530 (India Standard Time)",
        updatedAt: "Sun Nov 17 2024 00:00:00 GMT+0530 (India Standard Time)",
        title: "Mastering Python for Data Science",
        description:
          "A guide to mastering Python libraries and techniques for data analysis and visualization. Learn how to harness the power of Python to extract meaningful insights and perform complex data manipulations that can drive better business decisions.",
        profile: user2,
      });

      server.create("post", {
        createdAt: "Tue Nov 12 2024 00:00:00 GMT+0530 (India Standard Time)",
        updatedAt: "Thu Nov 14 2024 00:00:00 GMT+0530 (India Standard Time)",
        title: "The Secret to Perfect Cupcakes",
        description:
          "Tips and tricks for baking the fluffiest cupcakes with a touch of sweetness. Master the art of cupcake baking by understanding ingredient ratios, mixing techniques, and the perfect baking time to achieve that perfect rise and texture.",
        profile: user3,
      });

      server.create("post", {
        createdAt: "Sun Nov 10 2024 00:00:00 GMT+0530 (India Standard Time)",
        updatedAt: "Tue Nov 13 2024 00:00:00 GMT+0530 (India Standard Time)",
        title: "Exploring New Cities on a Budget",
        description:
          "Top tips for traveling on a budget without compromising on experience. Discover how to plan an exciting trip with limited funds, find affordable accommodations, and enjoy local experiences without breaking the bank.",
        profile: user4,
      });

      server.create("post", {
        createdAt: "Thu Nov 07 2024 00:00:00 GMT+0530 (India Standard Time)",
        updatedAt: "Fri Nov 08 2024 00:00:00 GMT+0530 (India Standard Time)",
        title: "DIY Home Projects",
        description:
          "Creative and simple home improvement ideas to try this weekend. Bring new life to your living space with these easy-to-follow DIY projects that are perfect for any skill level and budget.",
        profile: user1,
      });

      server.create("post", {
        createdAt: "Sat Nov 02 2024 00:00:00 GMT+0530 (India Standard Time)",
        updatedAt: "Tue Nov 05 2024 00:00:00 GMT+0530 (India Standard Time)",
        title: "Understanding Blockchain Technology",
        description:
          "A beginner's guide to blockchain and its applications beyond cryptocurrencies. Learn the fundamentals of blockchain, how it works, and its potential to transform industries such as finance, supply chain, and more.",
        profile: user2,
      });

      server.create("post", {
        createdAt: "Thu Oct 28 2024 00:00:00 GMT+0530 (India Standard Time)",
        updatedAt: "Fri Nov 01 2024 00:00:00 GMT+0530 (India Standard Time)",
        title: "Top 10 Places to Visit in Europe",
        description:
          "A travel guide to Europe's most iconic and breathtaking locations. Explore Europe’s rich culture, history, and natural beauty with this list of must-visit places for travelers seeking adventure and unique experiences.",
        profile: user3,
      });
    },

    routes() {
      // this.urlPrefix = "http://localhost:3000";

      this.get("/profiles", (schema) => {
        return schema.profiles.all();
      });

      this.get("/profiles/:id", (schema, request) => {
        const id = request.params?.id;
        return schema.profiles.find(id);
      });

      this.get("/posts", (schema) => {
        return schema.posts.all();
      });

      this.get("/posts/:id", (schema, request) => {
        const id = request.params?.id;

        return schema.posts.find(id);
      });

      this.post("/profiles", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        schema.profiles.create(attrs);
      });

      this.post("/posts", (schema, request) => {
        const data = JSON.parse(request.requestBody);

        data.createdAt = String(new Date());
        data.updatedAt = String(new Date());

        const post = schema.posts.create(data);

        return post;
      });

      this.patch("/posts/update/:id", (schema, request) => {
        const id = request.params?.id;
        const data = JSON.parse(request.requestBody);
        const post = schema.posts.find(id);

        data.updatedAt = new String(new Date());
        const updatedPost = post.update(data);

        return updatedPost;
      });

      this.delete("/posts/delete/:id", (schema, request) => {
        const id = request.params?.id;
        schema.posts.find(id).destroy();
      });

      this.delete("/profiles/delete/:id", (schema, request) => {
        const id = request.params?.id;

        const profile = schema.profiles.find(id);

        profile.posts.models.forEach((post) => {
          post.destroy();
        });

        profile.destroy();
      });

      this.patch("/profiles/update/:id", (schema, request) => {
        const id = request.params.id;
        const data = JSON.parse(request.requestBody);

        const profile = schema.profiles.find(id);
        const updatedProfile = profile.update(data);

        return updatedProfile;
      });

      this.get("/profiles/:id/posts", (schema, request) => {
        const id = request.params?.id;

        const user = schema.profiles.find(id);

        return user.posts;
      });

      this.post("/profile/admin", (schema, request) => {
        const data = JSON.parse(request.requestBody);
        const user = schema.profiles.findBy({ email: data.email });

        if (!user) {
          return new Response(404, {}, { message: "User not Found" });
        }

        if (user.role === "admin") {
          if (user.password === data.password) {
            user.lastActive = String(new Date());
            return user;
          } else {
            return new Response(401, {}, { message: "Invalid credentials" });
          }
        } else if (user.password) {
          return new Response(403, {}, { message: "only admins are allowed" });
        }
      });

      this.post("/admin/createuser", (schema, request) => {
        const userData = JSON.parse(request.requestBody);
        const user = schema.profiles.findBy({ email: userData?.email });

        const isExistUserUsername = schema.profiles.findBy({
          username: userData?.username,
        });

        if (isExistUserUsername) {
          return new Response(409, {}, { message: "Username taken" });
        }

        if (!user) {
          userData.createdAt = String(new Date());
          userData.lastActive = String(new Date());

          const data = schema.profiles.create(userData);
          return data;
        }

        if (user) {
          return new Response(409, {}, { message: "User exist" });
        }
      });

      this.post("/login", (schema, request) => {
        const userData = JSON.parse(request.requestBody);
        const user = schema.profiles.findBy({ email: userData.email });

        if (!user) {
          return new Response(404, {}, { message: "User not Found" });
        }

        if (user && user.password === userData.password) {
          userData.lastActive = String(new Date());
          const data = user.update(userData);

          return data;
        } else {
          return new Response(401, {}, { message: "Invalid credentials" });
        }
      });

      this.post("/newuser", (schema, request) => {
        const userData = JSON.parse(request.requestBody);

        // console.log(userData);

        userData.role = "user";

        const user = schema.profiles.findBy({ email: userData?.email });

        const isExistUserUsername = schema.profiles.findBy({
          username: userData?.username,
        });

        if (isExistUserUsername) {
          return new Response(409, {}, { message: "Username taken" });
        }

        if (!user) {
          userData.createdAt = String(new Date());
          userData.lastActive = String(new Date());
          userData.status = "active";

          const data = schema.profiles.create(userData);
          return data;
        }

        if (user) {
          return new Response(409, {}, { message: "User exist" });
        }
      });
    },
  });

  const mirageRequestHandler = server.pretender.handledRequest;
  server.pretender.handledRequest = (verb, path, request) => {
    if (!["get", "head"].includes(verb.toLowerCase())) {
      setLocalDb(server);
    }

    mirageRequestHandler(verb, path, request);
  };
}

function setLocalDb(server) {
  const dbDump = JSON.stringify(server.db.dump());

  sessionStorage.setItem("mirage-db", dbDump);
}
