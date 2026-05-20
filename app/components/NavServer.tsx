import { getMenuItems } from "@/lib/drupal";
import Nav from "./Nav";

export default async function NavServer() {
  const menuItems = await getMenuItems("main");
  return <Nav menuItems={menuItems} />;
}
