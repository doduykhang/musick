export const songs = [
    {
        id:1,
        title:"song 1",
        artist:"artist 1",
        album:"album 1",
        img:"https://i.scdn.co/image/ab67706f00000002c9f71ed97ed8a033d67df52a",
        uploadedDate: new Date("2020-01-01"),
        duration:270
    },
    {
        id:2,
        title:"song 2",
        artist:"artist 1",
        album:"album 1",
        img:"https://i.scdn.co/image/ab67706f00000002c9f71ed97ed8a033d67df52a",
        uploadedDate: new Date("2020-01-02"),
        duration:270
    },
    {
        id:3,
        title:"song 3",
        artist:"artist 1",
        album:"album 1",
        img:"https://i.scdn.co/image/ab67706f00000002c9f71ed97ed8a033d67df52a",
        uploadedDate: new Date("2020-01-03"),
        duration:270
    },
    {
        id:4,
        title:"song 4",
        artist:"artist 1",
        album:"album 1",
        img:"https://i.scdn.co/image/ab67706f00000002c9f71ed97ed8a033d67df52a",
        uploadedDate: new Date("2020-01-04"),
        duration:270
    },
    {
        id:5,
        title:"song 5",
        artist:"artist 1",
        album:"album 1",
        img:"https://i.scdn.co/image/ab67706f00000002c9f71ed97ed8a033d67df52a",
        uploadedDate: new Date("2020-01-05"),
        duration:270
    },
    {
        id:6,
        title:"song 6",
        artist:"artist 1",
        album:"album 1",
        img:"https://i.scdn.co/image/ab67706f00000002c9f71ed97ed8a033d67df52a",
        uploadedDate: new Date("2020-01-06"),
        duration:270
    },
    {
        id:7,
        title:"song 7",
        artist:"artist 1",
        album:"album 1",
        img:"https://i.scdn.co/image/ab67706f00000002c9f71ed97ed8a033d67df52a",
        uploadedDate: new Date("2020-01-07"),
        duration:270
    },
    {
        id:8,
        title:"song 8",
        artist:"artist 1",
        album:"album 1",
        img:"https://i.scdn.co/image/ab67706f00000002c9f71ed97ed8a033d67df52a",
        uploadedDate: new Date("2020-01-08"),
        duration:270
    },
    {
        id:9,
        title:"song 9",
        artist:"artist 1",
        album:"album 1",
        img:"https://i.scdn.co/image/ab67706f00000002c9f71ed97ed8a033d67df52a",
        uploadedDate: new Date("2020-01-09"),
        duration:270
    },
    {
        id:10,
        title:"song 10",
        artist:"artist 1",
        album:"album 1",
        img:"https://i.scdn.co/image/ab67706f00000002c9f71ed97ed8a033d67df52a",
        uploadedDate: new Date("2020-01-10"),
        duration:270
    },
    {
        id:11,
        title:"song 11",
        artist:"artist 1",
        album:"album 1",
        img:"https://i.scdn.co/image/ab67706f00000002c9f71ed97ed8a033d67df52a",
        uploadedDate: new Date("2020-01-11"),
        duration:270
    }
]

export const getSongs = (query,page,pageSize) => {
    const start = (page-1)*pageSize;
    const end = start + pageSize;
    const filteredSong = songs.filter(song=>song.title.includes(query)).slice(start,end);
    return filteredSong;
}