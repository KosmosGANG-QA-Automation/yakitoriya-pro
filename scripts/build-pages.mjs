// Собирает статическую демо-версию для GitHub Pages в папку out/.
// Серверные части (API, страница заказа) на время сборки убираются и затем возвращаются.
import { cpSync, existsSync, mkdirSync, renameSync, rmSync } from "node:fs";
import { spawnSync } from "node:child_process";

const stash = ".pages-stash";
const moved = ["src/app/api", "src/app/orders"];

rmSync(stash, { recursive: true, force: true });
mkdirSync(stash);
moved.forEach((p, i) => renameSync(p, `${stash}/${i}`));

let status = 1;
try {
  const res = spawnSync("npx", ["next", "build"], {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, NEXT_PUBLIC_STATIC: "1" },
  });
  status = res.status ?? 1;
} finally {
  moved.forEach((p, i) => cpSync(`${stash}/${i}`, p, { recursive: true }));
  rmSync(stash, { recursive: true, force: true });
}

if (status === 0 && existsSync("out")) {
  mkdirSync("out", { recursive: true });
  cpSync("out/index.html", "out/404.html");
}
process.exit(status);
