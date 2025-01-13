export default class Encoder {
  public static readonly defaultEncoding: BufferEncoding = 'base64';

  public static encode(data: string, encoding = Encoder.defaultEncoding) {
    return Buffer.from(data).toString(encoding);
  }

  public static decode(data: string, encoding = Encoder.defaultEncoding) {
    return Buffer.from(data, encoding).toString();
  }
}
