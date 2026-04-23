import dotenv from "dotenv";
import dns from "node:dns/promises";
import path from "path";

dotenv.config();
dotenv.config({ path: path.resolve("server/.env") });

const dnsServers = (process.env.DNS_SERVERS || "8.8.8.8,1.1.1.1")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

if (dnsServers.length > 0) {
  dns.setServers(dnsServers);
}
