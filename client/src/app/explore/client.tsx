const images = [
  "https://thedrum-media.imgix.net/thedrum-prod/s3/news/tmp/666306/grid_0_3.png?w=608&ar=default&fit=crop&crop=faces&auto=format",
  "https://cdn.pixabay.com/photo/2023/02/04/23/14/ai-generated-7768378_1280.jpg",
  "https://assets.newatlas.com/dims4/default/06c4449/2147483647/strip/true/crop/800x533+0+33/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2F2016-year-in-ai-art-2.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInlSz9vyVK2_edlRXNnevRGCdQyrXMCN6IQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_n4TnIG-vhidoxts31VJavR_ZFEtetBncZw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcJSQLKtK7fuACa1CnV5Znn7TSGnL9nFRXWQ&usqp=CAU",
  "https://thedrum-media.imgix.net/thedrum-prod/s3/news/tmp/666306/grid_0_3.png?w=608&ar=default&fit=crop&crop=faces&auto=format",
  "https://cdn.pixabay.com/photo/2023/02/04/23/14/ai-generated-7768378_1280.jpg",
  "https://assets.newatlas.com/dims4/default/06c4449/2147483647/strip/true/crop/800x533+0+33/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2F2016-year-in-ai-art-2.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInlSz9vyVK2_edlRXNnevRGCdQyrXMCN6IQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_n4TnIG-vhidoxts31VJavR_ZFEtetBncZw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcJSQLKtK7fuACa1CnV5Znn7TSGnL9nFRXWQ&usqp=CAU",
  "https://thedrum-media.imgix.net/thedrum-prod/s3/news/tmp/666306/grid_0_3.png?w=608&ar=default&fit=crop&crop=faces&auto=format",
  "https://cdn.pixabay.com/photo/2023/02/04/23/14/ai-generated-7768378_1280.jpg",
  "https://assets.newatlas.com/dims4/default/06c4449/2147483647/strip/true/crop/800x533+0+33/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2F2016-year-in-ai-art-2.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInlSz9vyVK2_edlRXNnevRGCdQyrXMCN6IQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_n4TnIG-vhidoxts31VJavR_ZFEtetBncZw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcJSQLKtK7fuACa1CnV5Znn7TSGnL9nFRXWQ&usqp=CAU",
  "https://thedrum-media.imgix.net/thedrum-prod/s3/news/tmp/666306/grid_0_3.png?w=608&ar=default&fit=crop&crop=faces&auto=format",
  "https://cdn.pixabay.com/photo/2023/02/04/23/14/ai-generated-7768378_1280.jpg",
  "https://assets.newatlas.com/dims4/default/06c4449/2147483647/strip/true/crop/800x533+0+33/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2Farchive%2F2016-year-in-ai-art-2.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSInlSz9vyVK2_edlRXNnevRGCdQyrXMCN6IQ&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_n4TnIG-vhidoxts31VJavR_ZFEtetBncZw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcJSQLKtK7fuACa1CnV5Znn7TSGnL9nFRXWQ&usqp=CAU",
];

export default function ExploreClient() {
  return (
    <div className="py-6 flex justify-center">
      <div className="w-[1000px] flex gap-2 flex-wrap">
        {images.map((image, index) => (
          <div key={index} className="w-[328px] h-[300px]">
            <img src={image} className="w-[328px] h-[300px] object-cover rounded" alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
