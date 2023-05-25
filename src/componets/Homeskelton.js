function HomeSkeleton() {
  return (
    <div>
      {Array(3)
        .fill(0)
        .map((item, i) => {
          return (
            <section className="md:grid md:grid-cols-2 md:gap-3 mb-4 animate-pulse">
              <div className="h-56 w-full bg-gray-200  dark:bg-gray-700  mb-4"></div>
              <div className="mt-2">
               <div class="h-5 bg-gray-300 rounded-sm dark:bg-gray-600 w-full"></div>
                <div className="flex mt-2 gap-2">
                 <div class="h-4 bg-gray-300 rounded-sm dark:bg-gray-600 w-24"></div>
                  <div class="h-4 bg-gray-200 rounded-sm dark:bg-gray-700 w-32"></div>
                </div>
                <div class="h-5 mt-4 bg-gray-300 rounded-sm dark:bg-gray-600 w-full"></div>
                <div class="h-5 mt-1 bg-gray-300 rounded-sm dark:bg-gray-600 w-full"></div>
                <div class="h-5 mt-1 bg-gray-300 rounded-sm dark:bg-gray-600 w-full"></div>
              </div>
            </section>
          );
        })}
    </div>
  );
}

export default HomeSkeleton;
