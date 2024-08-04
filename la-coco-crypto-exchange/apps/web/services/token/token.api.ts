
import { TokenService } from "@/core/services/token.service";
import Api from "../index";

import TokenRepoImpl from "./token.repository.impl";

const repository = new TokenRepoImpl(Api);
export const TokenApi = new TokenService(repository);
