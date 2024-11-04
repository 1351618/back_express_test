-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photo" TEXT
);

-- CreateTable
CREATE TABLE "word" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "word" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "language" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lang_code" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "word_word_key" ON "word"("word");

-- CreateIndex
CREATE UNIQUE INDEX "language_lang_code_key" ON "language"("lang_code");
