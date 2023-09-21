let time = new Date().toLocaleDateString();
let date = new Date().toLocaleTimeString('en-GB', {
    hour: "numeric",
    minute: "numeric"
})

export default [
    {
        id: 1,
        profilePicture: 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg',
        profileName: 'Bilal Shan',
        profileAddress: 'Public Colony Street Number 2',
        postTitle: 'Lorem ipsum dolor sit amet',
        postDescription: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes',
        postImage: 'https://img.freepik.com/free-photo/beautiful-view-greenery-bridge-forest-perfect-background_181624-17827.jpg?w=2000',
        postTime: `${date} ${time}`
    },
    {
        id: 2,
        profilePicture: 'https://imgv3.fotor.com/images/gallery/Realistic-Male-Profile-Picture.jpg',
        profileName: 'Usman Ali',
        profileAddress: 'Sector 9 Islamabad',
        postTitle: 'Lorem ipsum dolor sit amet',
        postDescription: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes',
        postImage: 'https://cdn.wallpapersafari.com/88/98/pgNYBA.jpg',
        postTime: `${date} ${time}`
    },
    {
        id: 3,
        profilePicture: 'https://static.fotor.com/app/features/img/aiface/advance/2.png',
        profileName: 'Zain Ali',
        profileAddress: 'GullShan Iqbal, Rahim Yar Khan',
        postTitle: 'Lorem ipsum dolor sit amet',
        postDescription: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes',
        postImage: 'https://images.pexels.com/photos/1187079/pexels-photo-1187079.jpeg?cs=srgb&dl=pexels-artem-saranin-1187079.jpg&fm=jpg',
        postTime: `${date} ${time}`
    },
    {
        id: 4,
        profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTltv6B_2o8eQcAyQJwRQusQe6X-uFANfqm5Fx_yYUgsoUbMw7GG9UiBQe4rWEfJeS7HyQ&usqp=CAU',
        profileName: 'Sikandar Raja',
        profileAddress: 'Jinah Town, Khan Pur',
        postTitle: 'Lorem ipsum dolor sit amet',
        postDescription: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes',
        postImage: 'https://i.pinimg.com/474x/2c/f5/f0/2cf5f074780e891af728f7a632424602.jpg',
        postTime: `${date} ${time}`
    },
    {
        id: 5,
        profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiaV77GPxFMMY0MFUAv-lywg5rQQIB-R6QxQ&usqp=CAU',
        profileName: 'Sara Khan',
        profileAddress: 'Johar Town, Lahore',
        postTitle: 'Lorem ipsum dolor sit amet',
        postDescription: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes',
        postImage: 'https://images.unsplash.com/photo-1625168016696-ced65453028d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8OTc2NjY5NXx8ZW58MHx8fHx8&auto=format&fit=crop&w=420&q=60',
        postTime: `${date} ${time}`
    }
]