class Sleep {
  public static readonly defaultSleepInMs = 100;

  public static async ms(ms = Sleep.defaultSleepInMs): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public static async exponentialBackoff(
    attempt: number,
    initialDelay = Sleep.defaultSleepInMs,
  ) {
    return Sleep.ms(initialDelay ** (attempt - 1));
  }
}

export default Sleep;
