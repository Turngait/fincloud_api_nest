import * as redis from 'redis';

class RedisClient {
  private static redisClient: any = null;
  private static connectionAttempts = 5;

  private static async connectToRedis() {
    try {
      this.redisClient = redis.createClient({
        url: 'redis://redis:6379',
      });
      this.redisClient.on('error', (error: any) =>
        console.error(`Error : ${error}`),
      );
      this.redisClient.on('connect', function () {
        console.log('Connected to redis');
      });

      await this.redisClient.connect();
    } catch (err) {
      if (RedisClient.connectionAttempts !== 0) {
        RedisClient.connectionAttempts--;
        await RedisClient.checkConnections();
      }
    }
  }

  private static async checkConnections(): Promise<void> {
    if (!this.redisClient) {
      await RedisClient.connectToRedis();
      RedisClient.setOnCloseConnection();
    }
  }

  public static async getValueByKey(key: string): Promise<string | null> {
    await RedisClient.checkConnections();

    try {
      return await this.redisClient.get(key);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public static async setValueByKey(
    key: string,
    value: string | number,
  ): Promise<boolean> {
    await RedisClient.checkConnections();

    try {
      await this.redisClient.set(key, value);
      return true;
    } catch (err) {
      return false;
    }
  }

  private static setOnCloseConnection(): boolean {
    try {
      if (!this.redisClient) {
        process.on('exit', function () {
          this.redisClient.quit();
        });
      }
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export default RedisClient;
