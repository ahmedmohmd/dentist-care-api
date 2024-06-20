-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileImage" TEXT NOT NULL DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAzIri_vc-2KP7J9fuB64mP0eF9VQjaO9JEw&usqp=CAU',
ADD COLUMN     "profileImagePublicId" TEXT NOT NULL DEFAULT '';
