class Api::PostsController < ApplicationController
  def index
    @posts = Post.where(postable_type: params[:postable_type], postable_id: params[:postable_id])
  end

  def show
    @post = Post.find_by(id: params[:id])    
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def update
    @post = Post.find_by(id: params[:id])
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def destroy
    @post = Post.find_by(id: params[:id])
    @post.destroy
    render json: @post
  end

  private
  def post_params
    params.require(:post).permit(:id, :author_id, :parent_id, :body, :postable_id, :postable_type)
  end

end