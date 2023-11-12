keeping track of whats happening and connecting the dots

# APP - API - STORE.JS

\*\* want to know what events the setupListeners is listening for and how are they connected like how does that func know these are the events that they're supposed to listen to and how does that help in having quickly updated data?

# COMPONENTS

dashFooter : this page basically is a page for the footer and we have a code solution for how to go home here if we aren't home.
dashHeader : so if we click on the h1 techNotes text it'll take us to /dash why a link tho not useNavigate?
there are stuff here to be completed tho, there is a nav el thats a sib for Link and it says add nav btn later but right now we just have the h1.
dashLayout : so here we have the container for the dash, it holds the header and footer and inside we have outlets for all the other comps that will be warped by the dashLayout which are : the notes the users and the welcome page
Layout : not sure if there will be more later here but Layout is a warping comp that only renders the wrapped comps. So just outlet is here for now. This is a general layout for all I think not sure why we needed it so lets see at the end of the course.
Public : this page just gives info about the website and an address and then allows users to go to the login page.

# CONFIG

we just have a roles file that holds an array that we export the purpose of it was to not write it over and over and lessen repetition so we just import it and use it from the file.

# FEATURES

- FOLDERS - AUTH
  Login: still empty with an h1
  PreFetch: \*\* missing info, but we have a wrapping func and inside it we sub to notes get func and users get func, finish this when i see the rest of the code
  Welcome: \*\* this comp has an h1 with a welcome and then bunch of links to different pages we have, one for the dash/notes one for dash/notes/new one for dash/users and one for dash/users/new we also show a day before all of that. What comp are being rendered for each of these paths:
- FOLDERS - NOTES
  notesApiSlice: nothing much to say, we have the createEntity to handle the state and selectors and we have the apiSlice to handle fetching data and manipulating it. Lets see what each of the exported is being used in the other notes files to get a better picture.
  EditNote:
  EditNoteForm:
  NewNote:
  NewNoteForm:
  Note:
  NotesList:
- FOLDERS - USERS
  usersApiSlice:
  EditUser:
  EditUserForm:
  NewUserForm:
  User:
  UsersList:

  # APP.JS

  # INDEX.JS
