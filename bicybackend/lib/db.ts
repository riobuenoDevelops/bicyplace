export default async function createDatabase(app) {
  try {
    //creating index if not exists
    const indexExists = await app.sdk.index.exists("bicyplace");
    if (!indexExists) {
      await app.sdk.index.create("bicyplace");
      app.log.info("Biclyplace index created");
    }

    //creating "Products" collection if not exists
    const collectionExists = await app.sdk.collection.exists(
      "bicyplace",
      "products"
    );
    if (!collectionExists) {
      await app.sdk.collection.create("bicyplace", "products");
      app.log.info("Products collection created");
    }

    const notificationExists = await app.sdk.collection.exists(
      "bicyplace",
      "notifications"
    );
    if (!notificationExists) {
      await app.sdk.collection.create("bicyplace", "notifications");
      app.log.info("Notification collection created");
    }

    const subscriptionExists = await app.sdk.collection.exists(
      "bicyplace",
      "subscriptions"
    );
    if (!subscriptionExists) {
      await app.sdk.collection.create("bicyplace", "subscriptions");
      app.log.info("Subscriptions collection created");
    }
  } catch (err) {
    console.error(err.message);
  }
}
