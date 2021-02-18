import { RouteConfig } from "../../services/swaggerService";

export const swaggerRoutes: Array<RouteConfig> = [
  {
    method: "post",
    route: "/mode",
    options: {
      "x-swagger-router-controller": "ModeRouter",
      operationId: "set",
      tags: ["Mode"],
      description: "Set arena mode.",
      parameters: [
        {
          name: "mode",
          in: "body",
          required: true,
          type: "number",
        },
      ],
      responses: {},
    },
  },
];
