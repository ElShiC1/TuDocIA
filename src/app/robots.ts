import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login", "/register"],
        disallow: [
          "/*?*",           
          "/trivia/",       
          "/trivia/*",      
          "/trivia/create",
          "/api",         
          "/api/",         
          "/api/*",         
          "/api/ia",        
          "/api/validate"
        ],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/login", "/register"],
        disallow: [
          "/*?*",
          "/trivia/",
          "/trivia/*",
          "/trivia/create",
          "/api",
          "/api/",
          "/api/*",
          "/api/ia",
          "/api/validate"
        ],
      }
    ],
  };
}
