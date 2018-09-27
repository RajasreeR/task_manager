using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using TaskManagerWebApp.Business;
using TaskManagerWebApp.Resolver;
using Unity;
using Unity.Lifetime;

namespace TaskManagerWebApp
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            var container = new UnityContainer();
            container.RegisterType<ITaskBo, TaskBo>(new HierarchicalLifetimeManager());
            config.DependencyResolver = new UnityResolver(container);

            //Enable cors
            config.EnableCors();

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
