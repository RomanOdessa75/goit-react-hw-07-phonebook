import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: '',
  },

  extraReducers: builder =>
    builder
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items = payload;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(item => item.id === payload.id);
        state.items.splice(index, 1);
      })
      .addMatcher(action => action.type.endsWith('/pending'), handlePending)
      .addMatcher(action => action.type.endsWith('/rejected'), handleRejected),

  // extraReducers: {
  //   [fetchContacts.pending]: handlePending,
  //   [fetchContacts.fulfilled](state, action) {
  //     state.isLoading = false;
  //     state.error = null;
  //     state.items = action.payload;
  //   },
  //   [fetchContacts.rejected]: handleRejected,
  //   [addContact.pending]: handlePending,
  //   [addContact.fulfilled](state, action) {
  //     state.isLoading = false;
  //     state.error = null;
  //     state.items.push(action.payload);
  //   },

  //   [addContact.rejected]: handleRejected,
  //   [deleteContact.pending]: handlePending,
  //   [deleteContact.fulfilled](state, action) {
  //     state.isLoading = false;
  //     state.error = null;
  //     const index = state.items.findIndex(
  //       contact => contact.id === action.payload.id
  //     );
  //     state.items.splice(index, 1);
  //   },
  //   [deleteContact.rejected]: handleRejected,
  // },
});

// ------------------------
// extraReducers: builder =>
//     builder
//       .addCase(fetchContacts.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.contacts = payload;
//       })
//       .addCase(addContact.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         state.contacts.push(payload);
//       })
//       .addCase(deleteContact.fulfilled, (state, { payload }) => {
//         state.loading = false;
//         const index = state.contacts.findIndex(
//           contact => contact.id === payload.id
//         );
//         state.contacts.splice(index, 1);
//       })
//       .addMatcher(action => action.type.endsWith('/pending'), handlePending)
//       .addMatcher(action => action.type.endsWith('/rejected'), handleRejected),
// ----------------------------

export const contactsReducer = contactsSlice.reducer;
