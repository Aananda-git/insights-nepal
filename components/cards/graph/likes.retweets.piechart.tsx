"use client";
import getTweets, { TweetPromiseProps, TweetProps } from "@/lib/tweets";
import { UserDataProps, getUserDetails } from "@/lib/user-details";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PieChart, Pie } from "recharts";

export default function LikeRetweetPieChart({ username, reply, limit }: TweetProps) {
  const [tweetData, setTweetData] = useState<TweetPromiseProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {data , status} = useQuery<UserDataProps>({
    queryKey: ["user-details", username],
    queryFn: () => getUserDetails({username}),
  });

  if (status === "loading") {
    return <div>loading...</div>;
  }


  if (status === "error") {
    return <div>error</div>;
  }

  console.log(data)


  const results = tweetData?.results || [];
  const views=results[0]?.views || null;
  const retweetCount=results[0]?.retweet_count || null;
  const favorite_count=results[0]?.favorite_count || null;


  // console.log(results);

  // const data = results.map((result) => ({
  //   name: result.creation_date,
  //   views: result.views,
  //   retweetCount: result.retweet_count,
  // }));

//   const data1 = results.map((result) => ({
//     name: result.creation_date,
//     views: result.views,
//     favorite_count: result.favorite_count,

//   }));

const data01 =[
    {Name:"liked",value:favorite_count},
    {Name:"not liked",value:(views-favorite_count)}
];

const data02 =[
    {Name:"retweeted",value:retweetCount},
    {Name:"not retweeted",value:(views-retweetCount)}
];
console.log(data01);
  
 
  return (
    <div className="border-black border m-4  p-20">
    <PieChart width={400} height={400}>
      <Pie
        data={data01}
        dataKey="value"
        cx={200}
        cy={200}
        outerRadius={60}
        fill="#8884d8"
      />
      <Pie
        data={data02}
        dataKey="value"
        cx={200}
        cy={200}
        innerRadius={70}
        outerRadius={90}
        fill="#82ca9d"
        label
      />
    </PieChart>
 
    </div>
  );
}