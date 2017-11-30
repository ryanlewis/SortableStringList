using System;
using System.Collections.Generic;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Core.PropertyEditors;

 public class StringListPropertyValueConverter : IPropertyValueConverter, IPropertyValueConverterMeta
    {
        public bool IsConverter(PublishedPropertyType propertyType)
        {
            return propertyType.PropertyEditorAlias.Equals("Epiphany.SortableStringList");
        }

        public object ConvertDataToSource(PublishedPropertyType propertyType, object source, bool preview)
        {
            if (source == null) { return null; }

            return DeserializeFromJson(source.ToString());
        }

        public object ConvertSourceToObject(PublishedPropertyType propertyType, object source, bool preview)
        {
            return source;
        }

        public object ConvertSourceToXPath(PublishedPropertyType propertyType, object source, bool preview)
        {
            return source.ToString();
        }

        public Type GetPropertyValueType(PublishedPropertyType propertyType)
        {
            return typeof(IList<string>);
        }

        public PropertyCacheLevel GetPropertyCacheLevel(PublishedPropertyType propertyType, PropertyCacheValue cacheValue)
        {
            PropertyCacheLevel returnLevel;
            switch (cacheValue)
            {
                case PropertyCacheValue.Object:
                    returnLevel = PropertyCacheLevel.ContentCache;
                    break;
                case PropertyCacheValue.Source:
                    returnLevel = PropertyCacheLevel.Content;
                    break;
                case PropertyCacheValue.XPath:
                    returnLevel = PropertyCacheLevel.Content;
                    break;
                default:
                    returnLevel = PropertyCacheLevel.None;
                    break;
            }
            return returnLevel;
        }

        private static IList<string> DeserializeFromJson(string json)
        {
            var jsonObject = Newtonsoft.Json.JsonConvert.DeserializeObject<IList<string>>(json);
            return jsonObject;
        }
    }